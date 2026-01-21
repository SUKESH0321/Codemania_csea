/**
 * Sort teams based on Round 1 rules:
 * 1. COMPLETED teams first (sorted by endTime - fastest wins)
 * 2. IN_PROGRESS teams next (sorted by solvedCount - more solved = higher)
 * 3. NOT_STARTED teams last
 */
function sortRound1Leaderboard(teams) {
  const statusPriority = {
    "COMPLETED": 1,
    "IN_PROGRESS": 2,
    "NOT_STARTED": 3
  };

  return teams.sort((a, b) => {
    const aPriority = statusPriority[a.round1.status];
    const bPriority = statusPriority[b.round1.status];

    // Different status → sort by priority
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // Both COMPLETED → faster finish time wins
    if (a.round1.status === "COMPLETED") {
      return new Date(a.round1.endTime) - new Date(b.round1.endTime);
    }

    // Both IN_PROGRESS → more solved questions = higher rank
    if (a.round1.status === "IN_PROGRESS") {
      return b.round1.solvedCount - a.round1.solvedCount;
    }

    // Both NOT_STARTED → keep original order
    return 0;
  });
}

module.exports = sortRound1Leaderboard;
