interface StudentTeacherCountProps {
    studentCount?: number;
    teacherCount?: number;
}

function StudentTeacherCount(props: StudentTeacherCountProps) {
    let stud: string = (props.studentCount === undefined || props.studentCount == null) ? "?" : props.studentCount!.toString();
    let teach: string = (props.teacherCount === undefined || props.studentCount == null) ? "?" : props.teacherCount!.toString();
    return (
        <div className="grid grid-cols-1 justify-items-center box-content">
            <div><p>Skolotāji / Skolēni</p></div>
            <div><p className="text-xl">{teach} / {stud}</p></div>
        </div>
    )
}

export default StudentTeacherCount;