import { Navigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../../../app/constants/common-function";
import { appLevelConstant } from "../../../app/constant";

function Protected({ children }) {
    const token = getItemFromLocalStorage(appLevelConstant.TOKEN_KEY);

    if(!token){
        return <Navigate to='/signin' replace={true}></Navigate>
    }

    return children;
}

export default Protected;