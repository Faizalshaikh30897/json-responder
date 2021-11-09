import {model, Schema, Document, Model} from 'mongoose';

export interface IResponder {
  hash: string;
  data: any;
}

export class ResponderDoc extends Document{
  hash: string;
  data: any;
}


interface IResponderModel extends Model<ResponderDoc>{
  build(responder: IResponder) : ResponderDoc;
}

const responderSchema = new Schema(
  {
    hash: {
      type: String,
      required: true
    },
    data: {
      type: Schema.Types.Mixed
    }
  }
);

responderSchema.statics.build = (responder: IResponder) => {
  return new ResponderModel(responder);
}

const ResponderModel = model<ResponderDoc,IResponderModel>('Responder',responderSchema);


export default ResponderModel;