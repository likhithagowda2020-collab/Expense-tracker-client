import React, { useEffect } from 'react'
import { Box, Paper, Button, FormControl, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
export default function Edit() {
  //const params=useParams()
  //console.log(params.id)
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    category: "",
  });
  const [isloading, setIsloading] = useState(false)
  const fetchSingleExpense = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/expense/view/${id}`)
      //console.log(res.data)
      if (res.data.success) {
        setFormData(res.data.expenseDetails)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {

    }
  };
  useEffect(() => {

    fetchSingleExpense();

  }, [])
  //console.log();
  const handleSubmit = async () => {
    //console.log(formData);
    setIsloading(true);
    const res = await axios.put(`http://localhost:7000/api/expense/edit/${id}`, formData);
    try {
      // console.log(res)
      if (res.data.success) {
        toast(res.data.message)
        setTimeout(() => {
          navigate("/");

        }, 2000);
      }
      else {
        toast(res.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsloading(false)
      }, 2000);
    }
  };
  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Add Expense Details</Typography>
      </Box>
      <Box sx={{ backgroundColor: "skyblue", p: 4, display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField value={formData.title} fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })} label="Enter expense title" placeholder="enter expense title" sx={{ mb: 2 }} />
          <TextField value={formData.amount} fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })} type="number" label="Enter expense amount" placeholder="enter expense amount" sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">select expense Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              label="select expense category"
              //onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"food"}>food</MenuItem>
              <MenuItem value={"travel"}>travel</MenuItem>
              <MenuItem value={"vlog"}>vlog</MenuItem>
              <MenuItem value={"fashion"}>fashion</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} sx={{ mb: 2 }} color="primary" variant="contained" fullWidth loading={isloading}>Submit</Button>
          <Button component={Link} to="/" sx={{ mb: 2 }} color="secondary" variant="contained" fullWidth>View Entries</Button>

        </Paper>
      </Box>
    </Box>
  )
}

