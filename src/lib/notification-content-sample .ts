export const NotificationContentSample = {
  NotificationType: {
    // Bài báo (1)
    article: {
      author:
        " đã gửi yêu cầu đăng tải bài báo lên hệ thống. Vui lòng kiểm tra và phê duyệt. ",
      admin: {
        accept:
          " đã phê duyệt bài báo của bạn. Cảm ơn bạn vì những đóng góp giá trị cho lĩnh vực khoa học! ",
        reject:
          " rất lấy làm tiếc khi bài báo của bạn chưa được phê duyệt. Vui lòng kiểm tra lại nội dung hoặc liên hệ với quản trị viên để biết thêm chi tiết. ",
      },
    },

    // Đề tài (2)
    researchTopic: {
      author:
        " đã nộp đề tài lên hệ thống. Vui lòng kiểm tra thông tin và tiến hành phân công phản biện đúng thời hạn.",
    },

    // Phản biện (3)
    reviewProcess: {
      author:
        " đã hoàn tất chỉnh sửa đề tài theo góp ý của bạn. Vui lòng kiểm tra để cập nhật thông tin mới nhất ",
      reviewer:
        " đã phản biện đề tài của bạn. Vui lòng xem xét phản hồi và tiếp tục hoàn thiện nội dung ",
    },

    // Phiếu đăng ký (4)
    registration: {
      author: " đã đăng ký tham gia cuộc thi ",
      organizer: {
        accept:
          " đã chấp thuận phiếu đăng ký của bạn. Vui lòng theo dõi thông báo để nộp đề tài đúng thời gian quy định. ",
        reject:
          " Phiếu đăng ký của bạn chưa được chấp nhận. Vui lòng kiểm tra lại thông tin đăng ký và thử lại. ",
      },
    },

    // Phân công phản biện (5)
    reviewAssignment: {
      reviewer: " đã phân công bạn phản biện cho đề tài ",
    },

    // tình trạng đề tài đủ yêu cầu để nghiệm thu hay không (6)
    reviewAcceptance: {
      organizer: {
        accept:
          " xác nhận đề tài của bạn đã đạt đủ yêu cầu để tiến hành nghiệm thu. Trong thời gian sắp tới hãy nỗ lực hoàn thành sản phẩm đúng thời hạn được giao. Chúc các bạn thành công. ",
        reject:
          " rất lấy làm tiếc khi đề tài của bạn chưa đạt đủ yêu cầu để tiến hành nghiệm thu. Nhà trường rất cảm ơn và luôn ghi nhận những đóng góp của các em trong lĩnh vực khoa học. ",
      },
    },
    // tạo nghiệm thu (7)
    acceptance: {
      organizer: {
        accept:
          " xin chúc mừng nhóm tác giả đã nghiệm thu thành công ở cấp Khoa. Sản phẩm nghiệm thu này sẽ được gửi lên cấp Trường cho lần phê duyệt kế tiếp, rất cảm ơn những đóng góp của nhóm tác giả trong lĩnh vực khoa học  ",
        reject:
          " rất lấy làm tiếc khi sản phẩm nghiệm thu của bạn chưa đạt đủ yêu cầu đề ra của ban tổ chức. Vui lòng cập nhật lại sản phẩm nghiệm thu sớm nhất, nếu không đủ thời gian các bạn có thể gửi yêu cầu gia hạn nghiệm thu trên hệ thống. Nội dung nhận xét: ",
      },
      author: {
        submit:
          " đã đề xuất sản phẩm nghiệm thu lên hệ thống, vui lòng sắp xếp thời gian và tổ chức một buổi nghiệm thu trực tiếp để đưa ra những nhận xét dành cho nhóm tác giả, sau đó phê duyệt sản phẩm nghiệm thu trên hệ thống ",
        update:
          " đã hoàn tất chỉnh sửa nghiệm thu theo yêu cầu của bạn, vui lòng kiểm tra để tiến hành phê duyệt hoặc góp ý chỉnh sửa. Nội dung cập nhật: ",
      },
    },
    // gia hạn thời gian nộp nghiệm thu (8)
    extendAcceptanceDeadline: {
      author:
        " đã gửi một yêu cầu xin gia hạn thời gian làm nghiệm thu cho đề tài ",
      organizer: {
        accept: "",
        reject: "",
      },
    },
    // phê duyệt nghiệm thu (9)
    approvedAcceptance: {
      organizer: {
        accept:
          " xin chúc mừng vì đề tài của bạn đã nghiệm thu thành công. Ban tổ chức sẽ chuyển sản phẩm nghiệp thu này đến nhà Trường để tiến hành phê duyệt cho giai đoạn tiếp theo. Nhận xét của chúng tôi như sau:  ",

        reject:
          " rất lấy làm tiếc vì đề tài của bạn vẫn chưa nghiệm thu thành công. Tuy nhiên chúng tôi có một số góp ý cho bạn như sau: ",
      },
      admin: {
        forAuthor: {
          accept:
            "Chúc mừng, Nhà trường đã phê duyệt nghiệm thu của bạn. Giờ đây sản phẩm của bạn sẽ được công khai lên hệ thống website. Nhà trường rất cảm ơn và ghi nhận những đóng góp to lớn của bạn trong lĩnh vực khoa học.",
          reject:
            "Nhà trường rất lấy làm tiếc vì một số lý do khách quan mà sản phẩm nghiệm thu của bạn không thể được phê duyệt để đăng tải lên hệ thống. Nhà trường rất lấy làm niềm tự hào vì những đóng góp to lớn của nhóm tác giả cho lĩnh vực khoa học",
        },
        forOrganizer: {
          accept:
            "Chúc mừng, nghiệm thu bạn vừa đề xuất đã được nhà Trường phê duyệt. Giờ đây sản phẩm nghiệm thu sẽ được công khai trên hệ thống website. Nhà trường rất cảm ơn sự điều hành mang lại kết quả tốt đẹp của ban tổ chức",
          reject:
            "Nhà trường rất lấy làm tiếc vì một số lý do khách quan mà sản phẩm nghiệm thu không thể được phê duyệt để đăng tải lên hệ thống. Nhà trường rất lấy làm niềm tự hào vì những đóng góp to lớn của ban tổ chức cho lĩnh vực khoa học",
        },
      },
    },
  },
};
