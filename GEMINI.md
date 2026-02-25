# Project Overview: e-wedding-invitation-firebase

Dự án này là một trang web thiệp mời đám cưới trực tuyến (Online Wedding Invitation) dành cho cặp đôi **Tiến Hưng & Bùi Trang**. Trang web được thiết kế hiện đại, hỗ trợ tốt trên cả thiết bị di động và máy tính, tích hợp các tính năng tương tác như đếm ngược, gửi lời chúc và nhạc nền.

## Công nghệ sử dụng
- **Frontend:** HTML5, CSS3 (Bootstrap 5.3.8), JavaScript (ES Modules).
- **Icons:** FontAwesome 7.1.0.
- **Backend Services:** 
  - **Firebase Hosting:** Lưu trữ và triển khai trang web.
  - **Cloud Firestore:** Lưu trữ lời chúc từ khách mời (collection `wishes`).
- **Media:** 
  - Hình ảnh được lưu trữ trên **Cloudinary** để tối ưu hóa tốc độ tải.
  - Nhạc nền được lưu trữ cục bộ trong thư mục `assets/music`.

## Cấu trúc thư mục
- `public/`: Thư mục gốc chứa các tài nguyên web sẽ được triển khai lên Firebase.
  - `index.html`: Điểm truy cập chính của trang web.
  - `404.html`: Trang lỗi tùy chỉnh.
  - `assets/`:
    - `css/`: Chứa các tệp style (`admin.css`, `animation.css`, `common.css`, `styles.css`).
    - `js/main.js`: Logic chính của ứng dụng, bao gồm khởi tạo Firebase và xử lý các hiệu ứng UI.
    - `images/`: Chứa các hình ảnh tĩnh như mã QR thanh toán.
    - `music/`: Chứa tệp âm thanh nền.
- `firebase.json` & `.firebaserc`: Cấu hình dự án Firebase.

## Hướng dẫn Phát triển & Triển khai

### 1. Chạy thử cục bộ
Dự án là một trang web tĩnh, bạn có thể chạy bằng bất kỳ server tĩnh nào (ví dụ: Live Server trong VS Code) hoặc sử dụng Firebase CLI:
```bash
firebase serve
```

### 2. Triển khai (Deploy)
Để triển khai lên Firebase Hosting, bạn cần cài đặt Firebase CLI và chạy lệnh:
```bash
firebase deploy --only hosting
```

### 3. Cấu hình Firebase
Thông tin cấu hình Firebase hiện đang được đặt trực tiếp trong `public/assets/js/main.js`. Khi thay đổi môi trường hoặc dự án, hãy cập nhật đối tượng `firebaseConfig` trong tệp này.

## Quy ước Phát triển
- **Giao diện:** Ưu tiên sử dụng các class của Bootstrap 5 để đảm bảo tính responsive.
- **JavaScript:** Sử dụng ES Modules và SDK Firebase v10+.
- **Hình ảnh:** Nên sử dụng định dạng `.webp` và lưu trữ trên Cloudinary để đảm bảo hiệu suất.
- **Mã nguồn:** Luôn giữ mã nguồn tường minh, ưu tiên tính dễ đọc và bảo trì.
