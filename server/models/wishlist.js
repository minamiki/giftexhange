import mongoose from ('mongoose')
import mongooseStringQuery from ('mongoose-string-query')
import timestamp from ('mongoose-timestamp')

const WishlistSchema = new Mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId ,
			required: true,
			trim: true
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		event_id: {
			type: mongooseSchema.Types.ObjectId,
			required: true
		},
		timestamp: {
			type: mongoose.Schema.Types.Timestamp
		},
		emailSent: {
			type: mongoose.Schema.Types.Boolean
		}
	}
)
