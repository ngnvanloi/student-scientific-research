const SignUpImageSidebar = () => {
  return (
    <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
      <div className="relative z-10 w-full max-w-md">
        <img src="https://floatui.com/logo-dark.svg" width={150} />
        <div className=" mt-16 space-y-3">
          <h3 className="text-white text-3xl font-bold">
            Bắt đầu những cống hiến của bạn
          </h3>
          <p className="text-gray-300">
            Tạo tài khoản để nhận những thông báo mới nhất về các cuộc thi diễn
            ra trên trang web, đồng thời giúp bạn quản lý những thành tựu khoa
            học của mình
          </p>
        </div>
      </div>
      <div
        className="absolute inset-0 my-auto h-[500px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
          filter: "blur(118px)",
        }}
      ></div>
    </div>
  );
};
export { SignUpImageSidebar };
