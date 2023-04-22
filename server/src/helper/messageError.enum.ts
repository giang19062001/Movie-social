export enum MessageError {
  WrongMediaType = 'Hình ảnh phải có kiểu  png,  jpg, jpeg',
  ExistedUser = 'Tài khoản đã tồn tại',
  NonExistedUser = 'Tài khoản không tồn tại',
  WrongPassword = 'Sai mật khẩu',
  NonRefreshToken = 'Truy cập bị từ chối - yêu cầu phải là refresh Token',
  NotEqualRefreshToken = 'Truy cập bị từ chối - refresh Token không trúng khớp hoặc hết hạn',
  NotEqualAccessToken = 'Truy cập bị từ chối - access Token không trúng khớp hoặc hết hạn',
  ErrorRole = 'Bạn không có quyền ',
}
