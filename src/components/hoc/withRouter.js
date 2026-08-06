import { useNavigate, useParams, useLocation } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    let param = useParams();

    const navigateTo = (link, state) => {
      navigate("/" + link, { state });
    };

    return (
      <Component
        navigate={navigate}
        navigateTo={navigateTo}
        location={location}
        params={param}
        {...props}
      />
    );
  };

  return Wrapper;
};
