const getSuccessfull = function (data) {
    const Obj = {
        "response": {
            "status": 1,
            "responseMessage": "Data return successfully",
        },
        "Data": data

    }
    return Obj;

}

module.exports.getSuccessfull = getSuccessfull;