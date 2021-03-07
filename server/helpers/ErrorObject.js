const returnErrorMessage = function (data) {
    const Obj = {
        "response": {
            "status": 0,
            "responseMessage": "Sorry, something went wrong!"
        },
        "Data": data

    }
    return Obj;

}
module.exports.returnErrorMessage = returnErrorMessage;