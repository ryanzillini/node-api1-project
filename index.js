const server = require("./api/server");

const PORT = 9000;

// START YOUR SERVER HERE
server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
