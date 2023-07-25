import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

// Room collection

const roomstart = parseInt(100);

let rooms = [
  {
    name: "Standard",
    seats: "150",
    price: "1000",
    amenities: "wifi,non-ac,screen with projector",
    roomID: "100",
    status: "true",
    bookedDetails: [
      {
        customerName: "Robin",
        bookedDate: new Date("2022-11-20"),
        startTime: "2022-11-20T08:30",
        endTime: "2022-11-20T11:30",
        status: "confirmed",
        roomID: "100",
      },
    ],
  },
  {
    name: "Elite",
    seats: "250",
    price: "2000",
    amenities: "wifi,ac,screen with projector",
    roomID: "101",
    status: "false",
    bookedDetails: [{}],
  },
  {
    name: "Premium",
    seats: "350",
    price: "3000",
    amenities: "wifi,ac,screen with projector",
    roomID: "102",
    status: "true",
    bookedDetails: [
      {
        customerName: "Sarvana",
        bookedDate: new Date("2022-12-25"),
        startTime: "2022-12-25T20:30",
        endTime: "2022-12-25T22:30",
        status: "Payment_Pending",
        roomID: "102",
      },
    ],
  },
];

//  Check the API endpoint
app.get("/", (req, res) => {
  res.status(200).send("I created API endpoint sucessfully");
});

// List all the rooms
app.get("/allroom", (req, res) => {
  try {
    res.status(200).send(rooms);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Can't get the Data" });
  }
});

// Get room specific id
app.get("/room/:id", (req, res) => {
  try {
    const { id } = req.params;
    const filteredRoom = rooms.filter((room) => room.roomID === id);
    res.status(200).send(filteredRoom);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Internal server error" });
  }
});
// Create the new room
app.post("/createroom", (req, res) => {
  try {
    const newRoom = { ...req.body, roomID: `${roomstart + rooms.length}` };
    rooms = [...rooms, newRoom];
    res.send({ newRoom, message: "Room created" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Give the valid Room details" });
  }
});

// Delete the room with id
app.delete("/room/delete/:id", (req, res) => {
  const { id } = req.params;
  const remainingRoom = rooms.filter((room) => room.roomID != id);
  rooms = [...remainingRoom];
  res.send({ rooms, message: "Deleted sucessfully" });
});

// List all the custormers
app.get("/listcustomer", (req, res) => {
  const customer = rooms.map((room) => {
    return [...room.bookedDetails, { RoomName: room.name }];
  });
  res.send(customer);
});

//booking room
app.post("/bookroom/:id", (req, res) => {
    const {id} = req.params;
    const filterRoom = rooms.filter((room)=>room.roomID === id)
    filterRoom[0].bookedDetails = [{...req.body,roomID:id}]
    res.send(rooms)
});

app.listen(PORT, () => console.log(`Server started in localhost : ${PORT}`));
