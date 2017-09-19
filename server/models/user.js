import mongoose from ('mongoose')
import mongooseStringQuery from ('mongoose-string-query')
import timestamp from ('mongoose-timestamp')

const UserSchema = new Mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true
		}, 
		email: {
			type: String,
			required: true,
			trim: true
		}
	}

)
