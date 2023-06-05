interface ExamFormData {
	address: string;
	examsToCheck: string[];
}

// interface ExamFormProps {
// 	onSubmit: (data: ExamFormData) => void;
// }

function ExamForm() {

	return (<form id="examForm" action="/" method="GET">
		<label htmlFor="address">Adrese:</label> <input type="text" name="address"/> <br/><br/>
		Kuri centralizētie eksāmeni tev interesē?
		<hr/>
		<input type="checkbox" id="matematika" name="matematika" value="True"/>
		<label htmlFor="matematika"> Matemātika</label><br/>

		<input type="checkbox" id="latv_val" name="latv_val" value="True"/>
		<label htmlFor="latv_val"> Latviešu Valoda</label><br/>

		<input type="checkbox" id="anglu_val" name="anglu_val" value="True"/>
		<label htmlFor="anglu_val"> Angļu Valoda</label><br/>

		<input type="checkbox" id="francu_val" name="francu_val" value="True"/>
		<label htmlFor="francu_val"> Franču Valoda</label><br/>

		<input type="checkbox" id="krievu_val" name="krievu_val" value="True"/>
		<label htmlFor="krievu_val"> Krievu Valoda</label><br/>

		<input type="checkbox" id="vacu_val" name="vacu_val" value="True"/>
		<label htmlFor="vacu_val"> Vācu Valoda</label><br/>

		<input type="checkbox" id="biologija" name="biologija" value="True"/>
		<label htmlFor="biologija"> Bioloģija</label><br/>

		<input type="checkbox" id="fizika" name="fizika" value="True"/>
		<label htmlFor="fizika"> Fizika</label><br/>

		<input type="checkbox" id="kimija" name="kimija" value="True"/>
		<label htmlFor="kimija"> Ķīmija</label><br/>

		<input type="checkbox" id="vesture" name="vesture" value="True"/>
		<label htmlFor="vesture"> Vēsture</label><br/><br/>

		{/* <button onClick={(e) => {
			e.preventDefault();
			const dataRaw = new FormData(document.getElementById('examForm')! as HTMLFormElement);
			let formData: ExamFormData = {
				address: dataRaw.get("address") as string,
				examsToCheck: []
			}

			if(dataRaw.has("matematika")) formData.examsToCheck.push("matematika");
			if(dataRaw.has("latv_val")) formData.examsToCheck.push("latv_val");
			if(dataRaw.has("anglu_val")) formData.examsToCheck.push("anglu_val");
			if(dataRaw.has("francu_val")) formData.examsToCheck.push("francu_val");
			if(dataRaw.has("krievu_val")) formData.examsToCheck.push("krievu_val");
			if(dataRaw.has("vacu_val")) formData.examsToCheck.push("vacu_val");
			if(dataRaw.has("biologija")) formData.examsToCheck.push("biologija");
			if(dataRaw.has("fizika")) formData.examsToCheck.push("fizika");
			if(dataRaw.has("kimija")) formData.examsToCheck.push("kimija");
			if(dataRaw.has("vesture")) formData.examsToCheck.push("vesture");

			console.log(formData);
			props.onSubmit.call(null, formData);
		}}>Atlasīt</button> */}

		<input type="submit" value="Atlasīt"></input>
	</form>)
}

export default ExamForm;