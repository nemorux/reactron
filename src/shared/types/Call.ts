enum CALL {
  IN = 0,
  OUT,
  MISS
}

interface Call {
  id: number;
  num: number;
  type: CALL,
  date: Date,
}

export {CALL};

export default Call;
