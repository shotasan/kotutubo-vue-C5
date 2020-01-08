def length
  [*1..9]
end

def cal
  result = []
  length.map do |n|
    result.push(double(n).unshift(n))
  end
  top(result)
  result
end

def double(n)
  length.map do |nums|
    nums * n
  end
end

def top(result)
  top_line = length.unshift(" ")
  result.unshift(top_line)
end

cal.each { |item| puts item.join(" ") }
