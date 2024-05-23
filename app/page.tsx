import Header from "../components/page/Header";
import Hero from "../components/page/Hero";

import { createClient } from "@/utils/supabase/client";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Header />
      <Hero />
    </div>
  )


}