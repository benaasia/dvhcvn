document.addEventListener('DOMContentLoaded', () => {
  const provinceSelect = document.getElementById('provinceSelect');
  const wardSelect = document.getElementById('wardSelect');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const resultDiv = document.getElementById('result');
  const selectedInfo = document.getElementById('selectedInfo');
  const selectedProvince = document.getElementById('selectedProvince');
  const selectedWard = document.getElementById('selectedWard');
  const selectedWardCode = document.getElementById('selectedWardCode');
  const selectedProvinceCode = document.getElementById('selectedProvinceCode');
  const suggestionList = document.getElementById('suggestionList');
  const clearBtn = document.getElementById('clearBtn');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  let suggestionTimeout = null;
  let lastQuery = '';

  // Theme toggle logic
  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('light-mode');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme === 'light') setTheme('light');
  else setTheme('dark');

  themeToggle.addEventListener('click', function() {
    const isLight = document.body.classList.toggle('light-mode');
    if (isLight) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme-mode', 'light');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme-mode', 'dark');
    }
  });

  function resetForm() {
    provinceSelect.value = '';
    wardSelect.innerHTML = '<option value="">-- Chọn Phường/Xã --</option>';
    searchInput.value = '';
    resultDiv.innerHTML = '';
    showSelectedInfo('', '', '', '');
    updateStats();
    suggestionList.style.display = 'none';
    clearBtn.style.display = 'none';
  }

  clearBtn.addEventListener('click', resetForm);

  fetch('/api/provinces')
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.province_code;
        option.textContent = p.name;
        provinceSelect.appendChild(option);
      });
    });

  function updateStats(provinceCode = '') {
    let url = '/api/stats';
    if (provinceCode) url += `?province_code=${provinceCode}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        document.getElementById('statProvinces').textContent = data.numProvinces;
        document.getElementById('statWards').textContent = data.numWards;
        document.getElementById('statCurrentWards').textContent = data.currentWards;
      });
  }

  updateStats();

  function showSelectedInfo(provinceName, wardName, wardCode, provinceCode) {
    if (!provinceName && !wardName && !wardCode) {
      selectedInfo.style.display = 'none';
      return;
    }
    selectedInfo.style.display = 'block';
    selectedProvince.textContent = provinceCode && provinceName ? (provinceCode + ' – ' + provinceName) : (provinceName || '');
    selectedWard.textContent = wardName || '';
    selectedWardCode.textContent = wardCode || '';
  }

  provinceSelect.addEventListener('change', () => {
    const code = provinceSelect.value;
    wardSelect.innerHTML = '<option value="">-- Chọn phường/xã --</option>';
    updateStats(code);
    if (!code) {
      showSelectedInfo('', '', '', '');
      return;
    }
    const selectedOption = provinceSelect.options[provinceSelect.selectedIndex];
    showSelectedInfo(selectedOption.textContent, '', '', code);
    fetch(`/api/wards?province_code=${code}`)
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        data.forEach(w => {
          const option = document.createElement('option');
          option.value = w.ward_code;
          option.textContent = w.name;
          wardSelect.appendChild(option);
        });
      });
  });

  wardSelect.addEventListener('change', () => {
    const provinceOption = provinceSelect.options[provinceSelect.selectedIndex];
    const provinceName = provinceOption ? provinceOption.textContent : '';
    const provinceCode = provinceSelect.value || '';
    const wardOption = wardSelect.options[wardSelect.selectedIndex];
    const wardName = wardOption && wardSelect.value ? wardOption.textContent : '';
    const wardCode = wardSelect.value || '';
    if (!provinceName && !wardName && !wardCode) {
      showSelectedInfo('', '', '', '');
      return;
    }
    showSelectedInfo(provinceName, wardName, wardCode, provinceCode);
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (!q) {
      resultDiv.innerHTML = '<div class="alert alert-warning">Vui lòng nhập từ khóa tìm kiếm.</div>';
      return;
    }
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          resultDiv.innerHTML = '<div class="alert alert-danger">Không tìm thấy kết quả.</div>';
          return;
        }
        let html = '<ul class="list-group">';
        data.forEach((item, idx) => {
          if (item.type === 'province') {
            html += `<li class="list-group-item search-result-item" data-type="province" data-province-code="${item.province_code}" data-name="${item.name}">Tỉnh/Thành: <b>${item.name}</b></li>`;
          } else if (item.type === 'ward') {
            html += `<li class="list-group-item search-result-item" data-type="ward" data-province-code="${item.province_code}" data-ward-code="${item.ward_code}" data-name="${item.name}" data-province-name="${item.province_name}"><b>${item.name}</b><br><span style='font-size:0.97em;opacity:0.85;'>(Tỉnh/Thành: ${item.province_name})</span></li>`;
          }
        });
        html += '</ul>';
        resultDiv.innerHTML = html;
        Array.from(document.querySelectorAll('.search-result-item')).forEach(el => {
          el.addEventListener('click', function() {
            const type = el.getAttribute('data-type');
            if (type === 'province') {
              showSelectedInfo(el.getAttribute('data-name'), '', '', el.getAttribute('data-province-code'));
            } else if (type === 'ward') {
              showSelectedInfo(el.getAttribute('data-province-name'), el.getAttribute('data-name'), el.getAttribute('data-ward-code'), el.getAttribute('data-province-code'));
            }
          });
        });
      });
  });

  function handleInput() {
    const q = searchInput.value.trim();
    if (q) {
      clearBtn.style.display = 'flex';
    } else {
      clearBtn.style.display = 'none';
    }
    if (suggestionTimeout) clearTimeout(suggestionTimeout);
    if (!q) {
      suggestionList.style.display = 'none';
      suggestionList.innerHTML = '';
      return;
    }
    suggestionTimeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then(res => res.json())
        .then(data => {
          if (!data.length) {
            suggestionList.style.display = 'none';
            suggestionList.innerHTML = '';
            return;
          }
          let html = '';
          data.slice(0,20).forEach(item => {
            if (item.type === 'province') {
              html += `<li class='suggestion-item' data-type='province' data-province-code='${item.province_code}'>
                <div class='suggestion-main'>
                  <span class='suggestion-title'>${item.name}</span>
                </div>
                <span class='suggestion-type-label province'>Tỉnh/TP</span>
              </li>`;
            } else if (item.type === 'ward') {
              html += `<li class='suggestion-item' data-type='ward' data-province-code='${item.province_code}' data-ward-code='${item.ward_code}'>
                <div class='suggestion-main'>
                  <span class='suggestion-title'>${item.name}</span>
                  <span class='suggestion-sub'>${item.province_name}</span>
                </div>
                <span class='suggestion-type-label ward'>Phường/Xã</span>
              </li>`;
            }
          });
          suggestionList.innerHTML = html;
          suggestionList.style.display = 'block';
          Array.from(suggestionList.querySelectorAll('.suggestion-item')).forEach((el, idx) => {
            el.addEventListener('mousedown', function(e) {
              e.preventDefault();
              const type = el.getAttribute('data-type');
              const provinceCode = el.getAttribute('data-province-code');
              if (type === 'province') {
                provinceSelect.value = provinceCode;
                provinceSelect.dispatchEvent(new Event('change'));
                suggestionList.style.display = 'none';
                searchInput.value = '';
                handleInput();
              } else if (type === 'ward') {
                const wardCode = el.getAttribute('data-ward-code');
                provinceSelect.value = provinceCode;
                provinceSelect.dispatchEvent(new Event('change'));
                setTimeout(() => {
                  wardSelect.value = wardCode;
                  wardSelect.dispatchEvent(new Event('change'));
                }, 250);
                suggestionList.style.display = 'none';
                searchInput.value = '';
                handleInput();
              }
            });
          });
        });
    }, 180);
  }

  searchInput.addEventListener('input', handleInput);

  searchInput.addEventListener('blur', function() {
    setTimeout(() => {
      suggestionList.style.display = 'none';
    }, 120);
  });
}); 