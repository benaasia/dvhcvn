# Bộ dữ liệu Đơn Vị Hành Chính Việt Nam 2 cấp

Bộ dữ liệu Đơn Vị Hành Chính Việt Nam theo Nghị quyết số 202/2025/QH15 của Quốc hội

# Demo

Xem demo tại đây: [https://34tinhthanh.com]
# Dự án Tra cứu Đơn vị Hành chính Việt Nam (34tinhthanh.com)

![Banner](https://34tinhthanh.com/image.webp)

**34tinhthanh.com** là một công cụ tra cứu và chuyển đổi đơn vị hành chính (ĐVHC) Việt Nam, được cập nhật theo dữ liệu mới nhất (ví dụ: Nghị quyết số 202/2025/QH15). Dự án cung cấp một giao diện web trực quan, một bộ API công khai và một công cụ chuyên dụng để chuyển đổi địa chỉ cũ sang địa chỉ mới sau sáp nhập.

**Website chính thức:** [https://34tinhthanh.com](https://34tinhthanh.com)

## ✨ Tính năng chính

- **Tra cứu nhanh:** Tìm kiếm và xem thông tin chi tiết về các tỉnh/thành phố và phường/xã.
- **Tìm kiếm thông minh:** Hỗ trợ tìm kiếm theo cả tên ĐVHC mới và cũ, không phân biệt chữ hoa/thường, có dấu/không dấu.
- **Chuyển đổi địa chỉ:** Một công cụ chuyên dụng giúp người dùng nhập địa chỉ cũ (Tỉnh, Huyện, Xã) và nhận về thông tin địa chỉ mới tương ứng.
- **API công khai:** Cung cấp các endpoint để lấy dữ liệu về tỉnh/thành, phường/xã, tìm kiếm và thống kê. Xem chi tiết tại [Tài liệu API](https://34tinhthanh.com/api-docs.html).
- **Giao diện thân thiện:** Hỗ trợ chế độ Sáng/Tối (Light/Dark mode) và tương thích với các thiết bị di động.
- **Dữ liệu có thể tải về:** Cung cấp bộ dữ liệu dưới dạng JSON/MySQL cho cộng đồng.

## 🚀 Công nghệ sử dụng

Dự án được xây dựng trên một kiến trúc kết hợp (hybrid) để tối ưu hóa cho từng tác vụ:

- **Frontend:** HTML, CSS, và JavaScript thuần (Vanilla JS).
- **Backend (API chính):**
    - **Node.js** và **Express.js** để phục vụ các API tra cứu (`/api/*`).
    - Dữ liệu được lưu trữ và truy vấn từ file JSON để đạt tốc độ phản hồi nhanh nhất.
- **Backend (API chuyển đổi địa chỉ):**
    - **PHP** để xử lý logic chuyển đổi địa chỉ (`/address-api.php`).
    - **MySQL** để lưu trữ và truy vấn bảng ánh xạ (`ward_mappings`) giữa địa chỉ cũ và mới.
- **Web Server:** **Apache** đóng vai trò là reverse proxy, điều hướng các yêu cầu:
    - `/api/*` được chuyển đến server Node.js.
    - `/address-api.php` được xử lý bởi PHP-FPM.
    - Các yêu cầu khác được phục vụ dưới dạng tệp tĩnh.
- **Quản lý tiến trình:** **PM2** được sử dụng để quản lý và giữ cho ứng dụng Node.js luôn hoạt động.

## 🔧 Hướng dẫn Cài đặt và Triển khai

### Yêu cầu
- Máy chủ web (ví dụ: Apache)
- Node.js và npm
- PHP và PHP-FPM
- MySQL Server

### Các bước cài đặt

1.  **Tải mã nguồn:**
    Clone hoặc tải mã nguồn của dự án về máy chủ.
    ```bash
    git clone <your-repo-url> /home/f34tinhthanhcom/34tinhthanh.com
    cd /home/f34tinhthanhcom/34tinhthanh.com
    ```

2.  **Cài đặt Backend Node.js:**
    Cài đặt các gói phụ thuộc và khởi động server bằng PM2.
    ```bash
    # Cài đặt các gói npm
    npm install

    # Cài đặt PM2 trên toàn hệ thống (nếu chưa có)
    sudo npm install -g pm2

    # Khởi động server Node.js với PM2
    pm2 start server.js --name 34tinhthanh-api

    # Lưu lại danh sách tiến trình để tự khởi động lại khi reboot
    pm2 save
    pm2 startup
    ```

3.  **Cài đặt Backend PHP & Database:**
    - Import dữ liệu vào database MySQL của bạn. Đảm bảo bạn có bảng `ward_mappings` và các bảng liên quan khác.
    - Cập nhật thông tin kết nối database trong file `public/address-api.php`:
      ```php
      $host = 'localhost';
      $db   = '34tinhthanhcom';
      $user = '34tinhthanhcom';
      $pass = 'aumu1ibbyrwxh5f5eyof';
      ```

4.  **Cấu hình Apache:**
    - Tạo một file Virtual Host cho trang web (ví dụ: `/etc/apache2/sites-available/34tinhthanh.com.conf`) với nội dung tương tự file `site_134263.conf` trong dự án.
    - Đảm bảo `DocumentRoot` trỏ đúng vào thư mục `public`:
      ```apache
      DocumentRoot "/home/f34tinhthanhcom/34tinhthanh.com/public"
      ```
    - Kích hoạt các module Apache cần thiết:
      ```bash
      sudo a2enmod ssl rewrite proxy proxy_http headers
      ```
    - Kích hoạt trang web và kiểm tra cấu hình:
      ```bash
      sudo a2ensite 34tinhthanh.com.conf
      sudo apache2ctl configtest
      ```
    - Khởi động lại Apache:
      ```bash
      sudo systemctl restart apache2
      ```

5.  **Phân quyền:**
    Đảm bảo người dùng web server (`www-data`) có quyền đọc và thực thi trên thư mục dự án.
    ```bash
    sudo chown -R www-data:www-data /home/f34tinhthanhcom/34tinhthanh.com
    sudo find /home/f34tinhthanhcom/34tinhthanh.com -type d -exec chmod 755 {} \;
    sudo find /home/f34tinhthanhcom/34tinhthanh.com -type f -exec chmod 644 {} \;
    ```

## ❤️ Ủng hộ

Nếu bạn thấy dự án này hữu ích, hãy xem xét ủng hộ để giúp tác giả duy trì và phát triển dự án.

---
© 2025 34tinhthanh.com
