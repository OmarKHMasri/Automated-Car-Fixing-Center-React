import { useState } from "react";
import {
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
} from "@mui/material"
import axios from "axios";
import governoratesData from "../../JSON/governoratesData.json"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SearchCarForm(props) {

    const [formData, setFormData] = useState({
        regCity: '',
        plateNumber: '',
    })

    const [carStatus, setCarStatus] = useState([0, {}])
    // 0: starting value
    // 1: the car is in the database
    // 2: the car is not in the database

    // const params = new URLSearchParams();
    const searchParams = {
        ...(formData.regCity && { regCity: formData.regCity }),
        ...(formData.plateNumber && { plateNumber: formData.plateNumber })
    };

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);

        axios.get('https://6803758e0a99cb7408ec0c5e.mockapi.io/api/usersEnd/Cars', { params: searchParams })
            .then((res) => setCarStatus([1, res.data]))
            .catch((err) => setCarStatus([2, err.response.data]))
            .then(console.log(carStatus)
            )
    }

    const isValidPlateNumber = (value) => {
        return value && /^\d{6,7}$/.test(value);
    };

    function handlePlateNumberChange(e) {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 7) {
            setFormData({
                ...formData,
                plateNumber: value
            });
        }
    };

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    return (
        <>
            <Box
                onSubmit={handleSubmit}
                component="form"
                className="FirstForm"
            >
                <FormControl>
                    <InputLabel>Registered City</InputLabel>

                    <Select
                        label="Registered City"
                        name="regCity"
                        value={formData.regCity || ""}
                        onChange={handleChange}
                        required
                    >
                        {governoratesData.governorates.map((gov) =>
                            <MenuItem value={gov.value}>{gov.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextField
                    name="plateNumber"
                    value={formData.plateNumber}
                    label="Car Plate Number"
                    onChange={handlePlateNumberChange}
                    inputProps={{
                        maxLength: 7,
                        inputMode: "numeric",  // Shows numeric keyboard on mobile
                    }}
                    required
                    error={!isValidPlateNumber(formData.plateNumber) && formData.plateNumber !== ""}
                    helperText={
                        !isValidPlateNumber(formData.plateNumber) && formData.plateNumber !== ""
                            ? "Must be 6 or 7 digits"
                            : ""
                    }
                    fullWidth
                />

                <Button type="submit">Submit</Button>

            </Box>

            <Stack sx={{ width: '100%' }} spacing={2}>
               { carStatus[0] == 1 && 
               <Alert severity="success">The car is in the database</Alert>}
               { carStatus[0] == 2 &&
                <Alert severity="error">{carStatus[1]}</Alert>}
            </Stack>

        </>
    )
}