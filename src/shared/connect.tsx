import { StoreContext } from "./context/storeContext";

export function connect(Component: any) {
  return function CoonnectComponent(props: any) {
    return (
      <StoreContext.Consumer>
        {(context) => <Component {...props} store={context} />}
      </StoreContext.Consumer>
    );
  };
}
