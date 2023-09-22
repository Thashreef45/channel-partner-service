import nodeApp from "./app";

const Port = String(process.env.PORT)
new nodeApp().listen(Port)


