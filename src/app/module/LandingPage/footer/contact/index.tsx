import React from "react";
import { Text, Stack } from "@chakra-ui/react";
import QRcodeList from "./QRcodeList";
import { image } from "framer-motion/client";

const QRcodeTable = [
  {
    code_id: 1,
    description: "Office Wechat",
    img_src: "",
  },
  { code_id: 2, 
    description: "Customer Service QR Code",
    img_src: "" },
];

function Contact() {
  return (
    <Stack>
      <Text color="black" fontSize="xl">
        Contact Us
      </Text>
      <Text color="grey" fontSize="sm">
        Join IFA Translator and experience smart translation. Scan the code to
        contact us for inquiries.
      </Text>
      <QRcodeList QRCodeList={QRcodeTable}></QRcodeList>
    </Stack>
  );
}

export default Contact;
