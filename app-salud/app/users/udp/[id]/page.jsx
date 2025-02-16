import EditUserProfile from "../../../components/EditUserProfile";

const EditPage = ({ params }) => {
  console.log("Params en EditPage:", params); 
  return <EditUserProfile params={params} />;
};

export default EditPage;
