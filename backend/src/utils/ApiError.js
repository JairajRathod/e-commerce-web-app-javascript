export default function ApiError({
  res,
  statusCode = 401,
  detailMessage = "",
}) {
  return res.status(statusCode).send({
    success: false,
    error: {
      detailMessage,
    },
  });
}
