import Store from "./Store/Store";
import Routes from "./Routes";
import SEO from "./SEO";

function App() {
  return (
    <Store>
      <SEO
        title="Apdated"
        description="Customize and send automated status notifications to your customers so they can easily view dashboards to track progress."
        imgUrl={`${process.env.PUBLIC_URL}/logo.svg`}
        url={process.env.PUBLIC_URL || ''}
      />      <Routes />
    </Store>
  );
}

export default App;
