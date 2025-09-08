# Tóm tắt ngữ cảnh dự án Resona Music

Đây là bản tóm tắt phiên làm việc để giúp Gemini nhớ lại bối cảnh cho lần sau.

**Ngày:** 08/09/2025
**Dự án:** `resona` - Ứng dụng nghe nhạc bằng Angular và NestJS.
**Kiến trúc:** Frontend Angular sử dụng NgRx để quản lý state.

---

### Mục tiêu & Các vấn đề đã giải quyết:

**1. Sửa lỗi tìm kiếm (Search):**
- **Vấn đề:** Chức năng tìm kiếm chỉ hoạt động cho "Category", không hoạt động cho "Track", "Playlist", "Profile".
- **Phân tích:** Phát hiện ra `HeaderComponent` chỉ dispatch action `searchCategories` khi người dùng nhập vào ô tìm kiếm.
- **Giải pháp:** Đã sửa `HeaderComponent` để dispatch thêm các action `searchTracks`, `searchPlaylists`, và `searchProfiles`.

**2. Sửa lỗi binding dữ liệu History:**
- **Vấn đề:** Dữ liệu lịch sử nghe nhạc không hiển thị ra được ở `ProfileComponent`.
- **Phân tích & Giải pháp:**
    1.  **Sửa State & Reducer:** `HistoryState` bị thiếu `loading`, `error` và `initialHistoryState`. Đã sửa lại file `history.state.ts` và `history.reducer.ts` cho đúng chuẩn.
    2.  **Đăng ký Reducer & Effect:** Phát hiện `historyReducer` và `HistoryEffects` chưa được đăng ký trong `app.config.ts`. Đã import và thêm chúng vào `provideStore` và `provideEffects`.
    3.  **Sửa Effect không tương thích:** Gặp lỗi biên dịch do `history.effect.ts` được viết theo kiểu Class-based, không nhất quán với các functional effect khác. Đã refactor lại `history.effect.ts` sang dạng functional.

**3. Triển khai tự động lưu lịch sử nghe nhạc:**
- **Vấn đề:** Cần tự động gọi API `POST /history` mỗi khi người dùng nghe một bài hát.
- **Phân tích & Giải pháp:**
    1.  **Xác định đúng Action:** Lỗi TypeScript xảy ra do ban đầu effect lắng nghe action `play` (không có payload). Đã xác định đúng action cần lắng nghe là `setTrack`, vì nó chứa thông tin bài hát.
    2.  **Tạo Effect mới:** Đã tạo một effect mới là `addToHistoryOnSetTrack$` bên trong `history.effect.ts`.
    3.  **Luồng hoạt động:** Effect này sẽ tự động được kích hoạt khi có action `setTrack` được dispatch từ bất kỳ đâu trong ứng dụng. Nó sẽ lấy `userId` từ `AuthState` và `trackId` từ payload của action, sau đó gọi `historyService.addToHistory()` để lưu vào backend.

---

### Trạng thái hiện tại:

- Tính năng lịch sử đã hoàn thiện.
- Dữ liệu được tự động lưu vào backend khi người dùng chọn một bài hát mới.
- Dữ liệu lịch sử được tải và hiển thị chính xác trong tab "History" của trang Profile.
- Không cần phải can thiệp vào các component để gọi API thủ công nữa.
