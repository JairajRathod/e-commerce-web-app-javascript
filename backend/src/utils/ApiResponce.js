export default function ApiResponce({
  res,
  statusCode = 201,
  activityType = "",
  responceData = [],
}) {
  return res.status(statusCode).send({
    success: true,
    activityType,
    data: {
      responceData,
    },
  });
}
