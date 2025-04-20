import { useState, useEffect } from 'react'
import governoratesData from '../../JSON/governoratesData.json'
import {
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
} from "@mui/material"
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios'

export default function AddCarForm(props) {

    const [formData, setFormData] = useState({
        regCity: '',
        carMan: '',
        carMod: '',
        carYear: '',
        addDate: '',
        plateNumber: '',
        carColor: '',
        carMileage: '',
        carOwner: '',
    })

    console.log(formData);
    

    useEffect(() => {
        if (props.clickedRow && props.clickedRow[1] == 0) {
            axios.get(`https://6803758e0a99cb7408ec0c5e.mockapi.io/api/usersEnd/Cars/${props.clickedRow[0]}`)
            .then(console.log(props.clickedRow[0])
            )
                .then((res) => setFormData(res.data));
        }
    }, [props.clickedRow]);

    function handleDelete() {
        axios.delete(`https://6803758e0a99cb7408ec0c5e.mockapi.io/api/usersEnd/Cars/${props.clickedRow[0]}`)
        .then(() => props.setClickedRow(props.clickedRow[1] = 1))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData);

        if (props.clickedRow && props.clickedRow[1] == 0){
             axios.put(`https://6803758e0a99cb7408ec0c5e.mockapi.io/api/usersEnd/Cars/${props.clickedRow[0]}`, formData)
             .then(() => props.setClickedRow(props.clickedRow[1] = 1))
        } else{
            axios.post('https://6803758e0a99cb7408ec0c5e.mockapi.io/api/usersEnd/Cars', formData)
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const isValidPlateNumber = (value) => {
        return value && /^\d{6,7}$/.test(value);
    };

    // Change handler
    function handlePlateNumberChange(e) {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 7) {
            setFormData({
                ...formData,
                plateNumber: value
            });
        }
    };

    return (
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

            <TextField
                name="carMan"
                value={formData.carMan}
                id="Car Manufacturer"
                type="text"
                label="Car Manufacturer"
                onChange={handleChange}
                required
            />

            <TextField
                name="carMod"
                value={formData.carMod}
                id="Car Model"
                type="text"
                label="Car Model"
                onChange={handleChange}
                required
            />

            <TextField
                name="carColor"
                value={formData.carColor}
                id="Car Color"
                type="text"
                label="Car Color"
                onChange={handleChange}
                required
            />

            <TextField
                name="carMileage"
                value={formData.carMileage}
                id="Car Mileage"
                type="number"
                label="Car Mileage"
                onChange={handleChange}
                required
            />

            <TextField
                name="carOwner"
                value={formData.carOwner}
                id="Car Owner"
                type="text"
                label="Car Owner"
                onChange={handleChange}
                required
            />

            <TextField
                name="carYear"
                value={formData.carYear}
                id="Car Year"
                type="number"
                label="Car Year"
                onChange={handleChange}
                inputProps={{
                    min: 1900,
                    max: dayjs().format("YYYY")
                }}
                required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    name="addDate"
                    value={dayjs(formData.addDate)}
                    onChange={(newValue) => {
                        setFormData({ ...formData, addDate: newValue });
                    }}
                    label="Uncontrolled picker"
                    defaultValue={dayjs()}
                    slotProps={{
                        textField: {
                            required: true,
                        },
                    }}
                />
            </LocalizationProvider>

            <Button type='submit' variant='contained'>
                Submit
            </Button>
            { props.clickedRow && props.clickedRow[1] == 0
             ? <Button variant='contained' color='error' onClick={handleDelete}>
                Delete
             </Button>
             : null
             }
        </Box>
    )
}