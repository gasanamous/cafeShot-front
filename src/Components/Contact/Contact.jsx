import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import InputComponenet from "./InputComponent";
import "../../App.css";

export default function Contact() {
  return (
    <div className="flex flex-col justify-center  text-center mb-4 md:px-2">
      <h1 className="text-[10px] md:text-lg  mb-6 txt3">
        Take the first step, we will take care for the rest
      </h1>
      <InputComponenet id="name" label="Name" />
      <InputComponenet id="email" label="Email" />
      <InputComponenet id="phone" label="Phone Number" />
      <InputComponenet id="message" label="Message" rows={4} />
      <div className="mt-4 px-2">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          className="w-full md:w-full self-center"
          style={{
            fontFamily: "Kurale",
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
}
