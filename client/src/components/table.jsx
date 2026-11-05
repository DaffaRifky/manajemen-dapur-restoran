export default function Table(){
    const staff = [
        { name: "Ayu Lestari", email: "ayu.lestari@example.com" },
        { name: "Budi Santoso", email: "budi.santoso@example.com" },
        { name: "Citra Dewi", email: "citra.dewi@example.com" }
    ]

    return(
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <table className="w-full border-collapse text-left">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide">Name</th>
                        <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide">Email</th>
                        <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                    {staff.map((person) => (
                        <tr key={person.email} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm font-medium text-slate-700">{person.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{person.email}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}