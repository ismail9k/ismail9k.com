export const useTracking = () => {
  const { gtag } = useGtag();

  const trackEvent = (eventName, parameters = {}) => {
    if (import.meta.client) {
      gtag('event', eventName, parameters);
    }
  };

  const trackBlogClick = (blogTitle, blogPath) => {
    trackEvent('blog_click', {
      event_category: 'engagement',
      event_label: blogTitle,
      blog_path: blogPath,
      click_text: blogTitle,
    });
  };

  const trackTalkClick = (talkTitle, videoId, location) => {
    trackEvent('talk_click', {
      event_category: 'engagement',
      event_label: talkTitle,
      video_id: videoId,
      talk_location: location,
      click_text: talkTitle,
    });
  };

  const trackSocialClick = (platform, url) => {
    trackEvent('social_click', {
      event_category: 'social_engagement',
      event_label: platform,
      outbound_url: url,
      click_text: platform,
    });
  };

  const trackProjectClick = (projectName, url) => {
    trackEvent('project_click', {
      event_category: 'projects',
      event_label: projectName,
      project_url: url,
      click_text: projectName,
    });
  };

  const trackThemeSwitch = (newTheme) => {
    trackEvent('theme_switch', {
      event_category: 'user_preference',
      event_label: newTheme,
      theme: newTheme,
    });
  };

  const trackNavigation = (destination, source = 'nav') => {
    trackEvent('navigation_click', {
      event_category: 'navigation',
      event_label: destination,
      navigation_source: source,
      destination: destination,
    });
  };

  const trackBlogView = (blogTitle, blogSlug, readingTime = null) => {
    trackEvent('blog_view', {
      event_category: 'content',
      event_label: blogTitle,
      blog_slug: blogSlug,
      reading_time: readingTime,
      content_type: 'blog_post',
    });
  };

  const trackScrollDepth = (percentage, path) => {
    trackEvent('scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      page_path: path,
      scroll_percentage: percentage,
    });
  };

  const trackEmailClick = () => {
    trackEvent('email_click', {
      event_category: 'contact',
      event_label: 'email_contact',
      click_text: 'email',
    });
  };

  const trackFileDownload = (fileName, fileType) => {
    trackEvent('file_download', {
      event_category: 'downloads',
      event_label: fileName,
      file_name: fileName,
      file_type: fileType,
    });
  };

  const trackUsesClick = (itemName, url, category) => {
    trackEvent('uses_click', {
      event_category: 'setup_page',
      event_label: itemName,
      outbound_url: url,
      item_category: category,
      click_text: itemName,
    });
  };

  return {
    trackEvent,
    trackBlogClick,
    trackTalkClick,
    trackSocialClick,
    trackProjectClick,
    trackThemeSwitch,
    trackNavigation,
    trackBlogView,
    trackScrollDepth,
    trackEmailClick,
    trackFileDownload,
    trackUsesClick,
  };
};
