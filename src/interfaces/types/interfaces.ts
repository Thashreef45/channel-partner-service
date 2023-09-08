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

export {
    GrpcCallBack,
    CpdataCall,
    SearchByPinCall,
    SearchById,
    ValidateAwbCall
}
