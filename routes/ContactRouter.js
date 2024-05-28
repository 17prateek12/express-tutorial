import express from "express"
import { getContacts, createContact, updateContact, deleteContact, getContact } from "../controllers/Contactcontroller.js"
import validateToken from "../middleware/validateTokenHandler.js"
const router= express.Router()

router.use(validateToken)
router.route("/").get(getContacts)

router.route("/").post(createContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

router.route("/:id").get(getContact)



export default router;
