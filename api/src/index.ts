import server from "./server";

const PORT = process.env.PORT || 8001;

// Constants
const serverStartMsg = "Express server started on port: ";

// Start server
server.listen(PORT, () => {
  console.log(`${serverStartMsg} ${PORT}`);
});
