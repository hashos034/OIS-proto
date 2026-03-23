"use client";

import StoriesContainer from "@/components/wrapped/StoriesContainer";
import IntroSlide from "@/components/wrapped/slides/IntroSlide";
import EngagementSlide from "@/components/wrapped/slides/EngagementSlide";
import CourseHighlightsSlide from "@/components/wrapped/slides/CourseHighlightsSlide";
import StreakSlide from "@/components/wrapped/slides/StreakSlide";
import WeeklyActivitySlide from "@/components/wrapped/slides/WeeklyActivitySlide";
import PersonalitySlide from "@/components/wrapped/slides/PersonalitySlide";
import FeedbackQualitySlide from "@/components/wrapped/slides/FeedbackQualitySlide";
import PeriodComparisonSlide from "@/components/wrapped/slides/PeriodComparisonSlide";
import ImpactSlide from "@/components/wrapped/slides/ImpactSlide";
import ShareCardSlide from "@/components/wrapped/slides/ShareCardSlide";
import { wrappedData } from "@/data/wrapped-mock";

export default function WrappedPage() {
  return (
    <StoriesContainer>
      {[
        <IntroSlide
          key="intro"
          name={wrappedData.student.name}
          semester={wrappedData.student.semester}
          academicYear={wrappedData.student.academicYear}
        />,
        <EngagementSlide
          key="engagement"
          totalEvaluations={wrappedData.engagement.totalEvaluations}
          peerPercentile={wrappedData.engagement.peerPercentile}
          averageResponseRate={wrappedData.engagement.averageResponseRate}
        />,
        <CourseHighlightsSlide
          key="course-highlights"
          courses={wrappedData.courseHighlights.courses}
        />,
        <StreakSlide
          key="streak"
          longestStreak={wrappedData.streak.longestStreak}
          favoriteDay={wrappedData.streak.favoriteDay}
        />,
        <WeeklyActivitySlide
          key="weekly-activity"
          weeks={wrappedData.weeklyActivity.weeks}
          peakWeek={wrappedData.weeklyActivity.peakWeek}
          pattern={wrappedData.weeklyActivity.pattern}
        />,
        <PersonalitySlide
          key="personality"
          type={wrappedData.personality.type}
          description={wrappedData.personality.description}
          topCategory={wrappedData.personality.topCategory}
          traits={wrappedData.personality.traits}
        />,
        <FeedbackQualitySlide
          key="feedback-quality"
          tier={wrappedData.feedbackQuality.tier}
          avgWordCount={wrappedData.feedbackQuality.avgWordCount}
          longestResponse={wrappedData.feedbackQuality.longestResponse}
          openQuestionRate={wrappedData.feedbackQuality.openQuestionRate}
        />,
        <PeriodComparisonSlide
          key="comparison"
          period1={wrappedData.periodComparison.period1}
          period2={wrappedData.periodComparison.period2}
        />,
        <ImpactSlide
          key="impact"
          courseName={wrappedData.impact.courseName}
          feedbackTopic={wrappedData.impact.feedbackTopic}
          changeDescription={wrappedData.impact.changeDescription}
          docentName={wrappedData.impact.docentName}
        />,
        <ShareCardSlide
          key="share"
          evaluationsCompleted={wrappedData.shareStats.evaluationsCompleted}
          personalityType={wrappedData.shareStats.personalityType}
          topCourse={wrappedData.shareStats.topCourse}
          streak={wrappedData.shareStats.streak}
        />,
      ]}
    </StoriesContainer>
  );
}
