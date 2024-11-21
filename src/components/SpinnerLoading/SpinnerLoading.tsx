const SpinnerLoading = () => {
  // return (
  //   <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
  //     <div className="flex justify-center items-center mt-[50vh]">
  //       <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex justify-center items-center">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
    </div>
  );
};
export { SpinnerLoading };
