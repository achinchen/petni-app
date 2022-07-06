type Props = {
  children: JSX.Element;
};

export default function Card({ children }: Props) {
  return (
    <section
      flex="~ col"
      w="40"
      h="54"
      p="3"
      bg="white"
      shadow="default"
      border="rounded-7"
    >
      {children}
    </section>
  );
}
