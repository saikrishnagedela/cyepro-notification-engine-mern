// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [form, setForm] = useState({
//     user_id: "",
//     event_type: "",
//     message: "",
//     priority_hint: "medium",
//   });

//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitEvent = async () => {
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/events`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();
//       setResult(data);
//     } catch {
//       setResult({ error: "Backend not reachable" });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6">
//       <div className="bg-[#0f172a] backdrop-blur-xl p-10 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800">
//         <h1 className="text-3xl font-semibold text-center mb-8 tracking-wide">
//           Notification Prioritization Engine
//         </h1>

//         <input
//           name="user_id"
//           placeholder="User ID"
//           className="w-full mb-4 p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           onChange={handleChange}
//         />

//         <input
//           name="event_type"
//           placeholder="Event Type"
//           className="w-full mb-4 p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           onChange={handleChange}
//         />

//         <input
//           name="message"
//           placeholder="Message"
//           className="w-full mb-4 p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           onChange={handleChange}
//         />

//         <select
//           name="priority_hint"
//           className="w-full mb-6 p-3 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           onChange={handleChange}
//         >
//           <option value="critical">critical</option>
//           <option value="high">high</option>
//           <option value="medium">medium</option>
//           <option value="low">low</option>
//         </select>

//         <button
//           onClick={submitEvent}
//           className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 p-3 rounded-lg font-medium text-lg"
//         >
//           {loading ? "Processing..." : "Classify"}
//         </button>

//         {result && (
//           <div className="mt-8 text-center">
//             {result.error ? (
//               <p className="text-red-500">{result.error}</p>
//             ) : (
//               <div
//                 className={`inline-block px-6 py-3 rounded-lg font-semibold text-lg ${
//                   result.classification === "NOW"
//                     ? "bg-red-600"
//                     : result.classification === "LATER"
//                     ? "bg-yellow-600"
//                     : "bg-gray-600"
//                 }`}
//               >
//                 Classification: {result.classification}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}