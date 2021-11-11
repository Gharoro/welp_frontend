import instance from "./api";

const getAllListings = async () => {
  const response = await instance.get("/listings/");
  return response;
};

const getListing = async (id) => {
  const response = await instance.get(`/listings/${id}`);
  return response;
};

const userSignup = async (data) => {
  const response = await instance.post("/users/register", data);
  return response;
};

const userLogin = async (data) => {
  const response = await instance.post("/users/login", data);
  return response;
};

const getUserListings = async () => {
  const response = await instance.get("/listings/user/all");
  return response;
};

const addListing = async (data, images) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("open_time", data.open_time);
  formData.append("category", data.category);
  formData.append("close_time", data.close_time);
  formData.append("working_hours", data.working_hours);
  formData.append("location", data.location);
  formData.append("address", data.address);
  formData.append("contact", data.contact);
 
  for (let i = 0; i < images.length; i++) {
    formData.append("images[]", images[i]);
  }

  const response = await instance.post("/listings", formData);
  return response;
};

const updateListing = async (data, images, id) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("open_time", data.open_time);
  formData.append("category", data.category);
  formData.append("close_time", data.close_time);
  formData.append("working_hours", data.working_hours);
  formData.append("location", data.location);
  formData.append("address", data.address);
  formData.append("contact", data.contact);
 
  for (let i = 0; i < images.length; i++) {
    formData.append("images[]", images[i]);
  }

  const response = await instance.put(`/listings/${id}`, formData);
  return response;
};

const deleteListing = async (id) => {
  const response = await instance.delete(`/listings/${id}`);
  return response;
};

export {
  getAllListings,
  getListing,
  userSignup,
  userLogin,
  getUserListings,
  addListing,
  updateListing,
  deleteListing
};
