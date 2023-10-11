import { Text, Link } from "@react-pdf/renderer";
import { Section } from "./section";
import { HStack, VStack } from "./stack";
import { RichText } from "./rich-text";
import { Fragment, ReactElement, ReactNode } from "react";
import { formatDate } from "./utils";
import { Theme } from "./theme";

type EventHighlightItemProps = {
  children: string;
};

export function EventHighlightItem({ children }: EventHighlightItemProps) {
  return (
    <HStack wrap={false} style={{ alignItems: "flex-start" }} gap={3}>
      <Text>•</Text>
      <RichText>{children}</RichText>
    </HStack>
  );
}

//

type EventItemProps = {
  title?: string;
  url?: string;
  titleDetails?: Array<ReactElement>;
  description?: string;
  children?: ReactNode;
  startDate?: string | number;
  endDate?: string | number;
  theme: Theme;
};

export function EventItem({
  title,
  url,
  children,
  description,
  titleDetails,
  startDate,
  endDate,
  theme,
}: EventItemProps) {
  return (
    <VStack wrap={false} gap={theme.space[2]}>
      <VStack gap={theme.space[1]}>
        <HStack
          style={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              marginRight: theme.space[5],
              flex: 1,
            }}
          >
            {url ? (
              <Link
                src={url}
                style={{
                  fontWeight: "medium",
                  color: theme.color.text,
                  textDecoration: "none",
                }}
              >
                {title}
              </Link>
            ) : (
              <Text style={{ fontWeight: "medium" }}>{title}</Text>
            )}

            {titleDetails &&
              titleDetails.map((titleDetail, index) => (
                <Fragment key={index}>
                  <Text style={{ color: theme.color.lightText }}> • </Text>
                  {titleDetail}
                </Fragment>
              ))}
          </Text>

          <Text style={{ color: theme.color.lightText }}>
            {startDate && formatDate(startDate)}
            {endDate ? ` - ${formatDate(endDate)}` : null}
          </Text>
        </HStack>

        {description && <RichText>{description}</RichText>}
      </VStack>

      <VStack gap={theme.space[2]}>{children}</VStack>
    </VStack>
  );
}

//

type EventSectionProps = {
  title: string;
  children: ReactNode;
  theme: Theme;
};

export function EventsSection({ title, children, theme }: EventSectionProps) {
  return (
    <Section theme={theme} title={title}>
      <VStack gap={theme.space[9]}>{children}</VStack>
    </Section>
  );
}
