type IProps = {
  children: React.ReactNode;
};
const AppContainer = (props: IProps) => {
  return <div className="px-[150px] min-h-lvh">{props.children}</div>;
};
export default AppContainer;
