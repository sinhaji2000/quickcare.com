const Appointment = require('../model/appointment');


exports.bookApoinmentController = async (req , res) => {

    try{

        const { docId  , date , timeSlot } = req.body ;


        const appointment = await Appointment.create({
            userId : req.user._id ,
            docId : docId ,
            date : date ,
            timeSlot : timeSlot
        })

        if(!appointment){
            return res.status(400).json({
                message : "Appointment not created",
                status : 400
            })
        }

        return res.status(201).json({
            message : "Appointment created successfully",
            status : 201,
            appointment
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message : "Internal Error",
            status : 500
        })
    }
}