export const baseFieldTransform = {
  toObject: {
    transform: function (doc: any, ret: any) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    },
  },
  toJSON: {
    transform: function (doc: any, ret: any) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    },
  },
}

export const hide_ = (ret: any) => {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
}
