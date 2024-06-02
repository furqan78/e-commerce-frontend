import { Navigate } from "react-router-dom";
import { decodeJwtToken, getItemFromLocalStorage } from "../../../app/constants/common-function";
import { appLevelConstant } from "../../../app/constant";

function AdminProtected({ children }) {
    const token = getItemFromLocalStorage(appLevelConstant.TOKEN_KEY);
    const userRole = decodeJwtToken(token);
    if(userRole.role !== appLevelConstant.ADMIN_LABEL){
        return <Navigate to='/signin' replace={true}></Navigate>
    }

    return children;
}

export default AdminProtected;