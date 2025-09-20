import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import type { Note } from "../../types/note";

const defaultValues: Note = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("Title is required"),
  constent: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (newNote: Note) => void;
}

function NoteForm({onClose, onSubmit}: NoteFormProps) {
  const formId = useId();

  const handleSubmit = (
    values: Note,
    actions: FormikHelpers<Note>
  ) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className={css.formGroup}>
          <label htmlFor={`${formId}-title`}>Title</label>
          <Field
            id={`${formId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${formId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${formId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${formId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${formId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;

/* 
<form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" className={css.input} />
    <span name="title" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <span name="content" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
    <span name="tag" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled=false
    >
      Create note
    </button>
  </div>
</form>

*/
