import React, { useState } from "react";
import { getRandomPrompt } from "@/utils";
import FormField from "@/Components/FormField";
import Loader from "@/Components/Loader";
import preview from "../../public/assets/preview.png";
import { useRouter } from "next/router";

const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateImg = async () => {
    if (form.prompt && !generatingImg) {
      try {
        console.log("Generating");
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (e) {
        alert(e);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      if (generatingImg) {
        alert("Image is generating, please wait!");
      } else {
        alert("Please enter a prompt");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.photo && form.name && form.prompt) {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          router.push("/");
        } else {
          alert(response.statusText);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter your name and a prompt to generate a image");
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="px-2 md:px-0">
        <h1 className="font-extrabold text-black text-2xl pt-3">Create</h1>
        <p className="text-base mt-2 text-gray-500">
          Create imaginative and visually stunning images through DALL-E AI and
          Share it with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl px-2 md:px-0" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an oil pastel drawing of an annoyed cat in a spaceship"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={"/assets/preview.png"}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40s"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-black/30">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating...." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-gray-500 text-base">
            Once you have created the image you want, you can share it with the
            community as well
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-blue-600 text-sm font-medium rounded-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing...." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
