import mongoose from ('mongoose')
import mongooseStringQuery from ('mongoose-string-query')
import timestamp from ('mongoose-timestamp')

const EventSchema = new Mongoose.Schema(
	{
		eventName: {
			type: String,
			required: true,
			trim: true
		}, 
		user_id: {
			type: mongoose.Schema.Types.ObjectId ,
			required: true,
			trim: true
		}
	}
)
