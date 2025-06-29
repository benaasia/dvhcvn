const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Đọc dữ liệu từ file JSON
const dataPath = path.join(__dirname, 'json', 'data.json');
let provinces = [];
try {
  const raw = fs.readFileSync(dataPath, 'utf8');
  provinces = JSON.parse(raw);
} catch (err) {
  console.error('Không thể đọc file dữ liệu:', err);
}

// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  return str.normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

// API lấy danh sách tỉnh/thành
app.get('/api/provinces', (req, res) => {
  const result = provinces.map(p => ({
    province_code: p.province_code,
    name: p.name
  }));
  res.json(result);
});

// API lấy danh sách phường/xã theo tỉnh/thành
app.get('/api/wards', (req, res) => {
  const { province_code } = req.query;
  const province = provinces.find(p => p.province_code === province_code);
  if (!province) return res.status(404).json({ error: 'Không tìm thấy tỉnh/thành' });
  res.json(province.wards || []);
});

// API tìm kiếm theo tên tỉnh/thành hoặc phường/xã
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  const keyword = q.toLowerCase();
  const keywordNoSign = removeVietnameseTones(keyword);
  let results = [];
  // Tìm trong tỉnh/thành
  provinces.forEach(p => {
    const nameLower = p.name.toLowerCase();
    const nameNoSign = removeVietnameseTones(nameLower);
    if (nameLower.includes(keyword) || nameNoSign.includes(keywordNoSign)) {
      results.push({
        type: 'province',
        province_code: p.province_code,
        name: p.name
      });
    }
    // Tìm trong phường/xã
    (p.wards || []).forEach(w => {
      const wNameLower = w.name.toLowerCase();
      const wNameNoSign = removeVietnameseTones(wNameLower);
      if (wNameLower.includes(keyword) || wNameNoSign.includes(keywordNoSign)) {
        results.push({
          type: 'ward',
          province_code: p.province_code,
          ward_code: w.ward_code,
          name: w.name,
          province_name: p.name
        });
      }
    });
  });
  res.json(results);
});

// API thống kê
app.get('/api/stats', (req, res) => {
  const { province_code } = req.query;
  const numProvinces = provinces.length;
  let numWards = 0;
  provinces.forEach(p => {
    numWards += (p.wards ? p.wards.length : 0);
  });
  let currentWards = 0;
  if (province_code) {
    const province = provinces.find(p => p.province_code === province_code);
    currentWards = province && province.wards ? province.wards.length : 0;
  }
  res.json({
    numProvinces,
    numWards,
    currentWards
  });
});

// Phục vụ file tĩnh frontend
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 