import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { pool } from "../db/index.js";

const registerSchool = asyncHandler(async (req, res) => {
  const { id, name, address, latitude, longitude } = req.body;

  if(id === "" || latitude === "" || longitude === "" || name === "" || address === ""){
      throw new ApiError(400, "All fields are required")
  }

  const dbconnection = await pool.getConnection();

  const [rows] = await dbconnection.execute("SELECT * FROM schools WHERE id = ?", [id]);

  if (rows.length > 0) {
    throw new ApiError(400, "School already exists");
  }

  await dbconnection.execute(
    "INSERT INTO schools (id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
    [id, name, address, latitude, longitude]
  );

  return res.status(201).json(
    new ApiResponse(200, "school registerd successfully")
  )

});


const listSchools = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body;
  
    if(latitude === "" || longitude === ""){
        throw new ApiError(400, "Please provide all details")
    }
  
    const dbconnection = await pool.getConnection();
  
  
    const [rows] = await dbconnection.execute(
        `SELECT *, 
            (6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
                COS(RADIANS(longitude) - RADIANS(?)) + 
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )) AS distance 
        FROM schools 
        ORDER BY distance ASC`,
        [latitude, longitude, latitude]
    );

    return res.status(200).json(
        new ApiResponse(200, "Schools fetched successfully", rows)
    );
  });



export { registerSchool, listSchools };
