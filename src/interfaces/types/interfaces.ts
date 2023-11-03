interface GrpcCallBack {
    (error: Error | null, response: any): void
}

interface CpdataCall {
    request: {
        id: string
    }
}

interface SearchByPinCall {
    request: {
        pincode: number
    }
}

interface SearchById {
    request: {
        id: string
    }
}

interface ValidateAwbCall {
    request: {
        awb: string;
        cpId: string;
    }
}

interface GetCpEmployees {
    request: {
        token : string;
    }
}


interface CreateNewEmployeeCall {
    request: {
        name : string;
        email : string;
        token : string;
        phone : number
    }
}


export {
    GrpcCallBack,
    CpdataCall,
    SearchByPinCall,
    SearchById,
    ValidateAwbCall,
    GetCpEmployees,
    CreateNewEmployeeCall
}
