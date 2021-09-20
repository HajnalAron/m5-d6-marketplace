export const badRequestError = (err, req, res, next) => {
    console.log(err)
    if(err.status === 400){
        if(err.errors){
        let newErrors = []
        err.errors.filter(error => err.errors.indexOf(error) % 2 != 0).forEach(error => {newErrors.push(error.msg)});
        err=newErrors
    }
        res.status(400).send(err)
    } else {
        next(err)
    }
}

export const forbiddenErrorHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send({message: err.message })
  } else {
    next(err)
  }
}

export const notFoundErrorHandler = (err, req, res, next) => {
  console.log(err)
  if (err.status === 404) {
    res.status(404).send({message: err.message })
  } else {
    next(err)
  }
}

export const genericServerErrorHandler = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({message: "Generic Server Error" })
}